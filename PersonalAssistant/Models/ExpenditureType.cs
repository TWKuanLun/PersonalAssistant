﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PersonalAssistant.Models
{
    public class ExpenditureType
    {
        [Key]
        public int? ID { get; set; }
        public string OwnerID { get; set; }
        public string TypeName { get; set; }
    }
}