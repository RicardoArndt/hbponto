﻿using HBPonto.Kernel.Interfaces.Authentication;
using HBPonto.Kernel.Interfaces.Entities;
using HBPonto.Kernel.Interfaces.Repositories;
using System.Linq;
using System.Collections.Generic;
using HBPonto.Database.Entities;

namespace HBPonto.Authentication.Services
{
    public class UserService : IUserService
    {
        IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public List<User> GetAllUsers()
        {
            return _userRepository.GetAll().ToList();
        }

        public void UpdateUser(User user)
        {
            _userRepository.Update(user);
        }
    }
}
