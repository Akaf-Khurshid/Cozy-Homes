using Microsoft.AspNetCore.Mvc;
using WebAPI.Dtos;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUnitOfWork uow;

        public AccountController(IUnitOfWork uow)
        {
            this.uow = uow;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginReqDto loginReq)
        {
            var user = await uow.UserRepository.Authenticate(loginReq.UserName, loginReq.Password);

            if (user == null)
            {
                return Unauthorized();
            }
            var loginRes = new LoginResDto();
            loginRes.UserName = user.Username;
            loginRes.Token = "Token to begenerated";
            return Ok(loginRes);
        }
    }
}
