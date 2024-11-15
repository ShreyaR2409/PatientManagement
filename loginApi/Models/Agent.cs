namespace loginApi.Models
{
    public class Agent
    {
        public int id { get; set; }
        public string AgentId { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string gender { get; set; }
        public string mobileNumber { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public bool isActive { get; set; } = true;
        public DateTime createdAt { get; set; } = DateTime.Now;
        public DateTime updatedAt { get; set; } = DateTime.Now;

    }
}
