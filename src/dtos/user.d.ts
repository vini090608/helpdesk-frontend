type UserAPIRole = "client" | "technical" | "admin"
type UserAPIHour = "H08"| "H09"| "H10"| "H11"| "H12"| "H13"| "H14"| "H15"| "H16"| "H17"| "H18"| "H19"| "H20"| "H21"| "H22"

type UserAPIResponse = {
    token: string
    user: {
        id: string
        name: string
        email: string
        role: UserAPIRole
        hour: UserAPIHour
        profile: string
    }
}

type User = {
  id: string;
  name: string;
  email: string;
  role: UserAPIRole;
  hour: UserAPIHour;
  profile: string;
};