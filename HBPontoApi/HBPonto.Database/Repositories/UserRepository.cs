﻿using HBPonto.Database.Contexts;
using HBPonto.Database.Entities;
using HBPonto.Kernel.Interfaces.Entities;
using HBPonto.Kernel.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace HBPonto.Database.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        private UserContext _context;

        public UserRepository(UserContext context) : base(context)
        {
            _context = context;
        }

        public User InsertNewUser(User user)
        {
            Insert(user);
            SaveAll();
            return user;
        }
    }
}