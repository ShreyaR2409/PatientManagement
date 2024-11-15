namespace loginApi.Models
{
    public class Patient
    {
        public int id { get; set; }
        public string PatientId { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string gender { get; set; }
        public string bloodgroup { get; set; }
        public DateTime dob { get; set; }
        public string email { get; set; }
        public string phonenumber { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string country { get; set; }
        public string medicalhistory { get; set; }
        public bool termsandcondition { get; set; } = false;
        public bool isActive { get; set; } = true;
        public DateTime createdAt { get; set; } = DateTime.Now;
        public DateTime updatedAt { get; set; } = DateTime.Now;
        public string AgentId { get; set; }
    }
}
