﻿using System.ComponentModel.DataAnnotations;

namespace PersonalAssistant.Models.AccountManager
{
    public class ExpenditureType
    {
        [Key]
        public int? ID { get; set; }
        [StringLength(50)]
        public string OwnerID { get; set; }
        [StringLength(100)]
        public string TypeName { get; set; }
    }
}
