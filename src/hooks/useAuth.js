// import { useNavigate } from "react-router";
// import { useToDoAPI } from "./useToDoApi";
// import { useMutation } from "@tanstack/react-query";

// export const useAuth = () => {
//   const nav = useNavigate();
//   const { login, registration } = useToDoAPI();

//   const signUp = useMutation({
//     mutationFn: (data) => registration(data),
//     onSuccess: (res) => {
//       if (res.access_token) {
//         localStorage.setItem("token", JSON.stringify(res.access_token));
//         nav("/");
//       }
//     },
//   });

//   const signIn = useMutation({
//     mutationFn: (data) => login(data),
//     onSuccess: (res) => {
//       if (res.access_token) {
//         localStorage.setItem("token", JSON.stringify(res.access_token));
//         nav("/");
//       }
//     },
//   });

//   return { signUp, signIn };
// };
