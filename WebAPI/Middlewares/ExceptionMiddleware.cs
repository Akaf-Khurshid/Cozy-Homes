using System.Net;
using WebAPI.Errors;

namespace WebAPI.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly IWebHostEnvironment env;
        private readonly RequestDelegate next;
        private readonly ILogger<ExceptionMiddleware> logger;

        public ExceptionMiddleware(IWebHostEnvironment env, RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            this.env = env;
            this.next = next;
            this.logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex) 
            {
                ApiError reponse;
                String message;
                var exceptionType = ex.GetType();

                HttpStatusCode statusCode;
                if (exceptionType == typeof(UnauthorizedAccessException))
                {
                    statusCode = HttpStatusCode.Forbidden;
                    message = "You are not authorized";
                }
                else
                {
                    statusCode = HttpStatusCode.InternalServerError;
                    message = "Some unknown error occoured";
                }
                if (env.IsDevelopment())
                {
                    reponse = new ApiError((int)statusCode, ex.Message, ex.StackTrace.ToString());
                }
                else
                {
                    reponse = new ApiError((int)statusCode, message);
                }
                logger.LogError(ex, ex.Message);
                context.Response.StatusCode= (int)statusCode;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(reponse.ToString());
            }
        }
    }
}
