// Structura standard a erorilor de validare .NET Core
export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  errors?: {
    [key: string]: string[]; // Ex: "PhoneNumber": ["Mesaj eroare"]
  };
}