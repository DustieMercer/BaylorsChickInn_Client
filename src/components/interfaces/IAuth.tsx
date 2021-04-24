export default interface IAuth {
  message: string;
  sessionToken: string;
  user: { 
      email: string; 
      id: number; 
      role: string };
}
