export interface FormTy{
    fullName:string;
    email:string;
    password?:string
    profile?:string;
    createdAt?:string;
}

export interface LoginFormTy{
    email:string;
    password:string
}

export const usersDuplicate = [
    {
      _id: "67c736422c512fd19efd3",
      email: "satis@gmail.com",
      fullName: "Satish",
      profilePic: "",
      createdAt: "2025-03-04T17:20:02.081+00:00",
      updatedAt: "2025-03-04T17:20:02.081+00:00"
    },
    {
      _id: "67c736422c512fd19efd4",
      email: "anil@gmail.com",
      fullName: "Anil Kumar",
      profilePic: "anil_pic.jpg",
      createdAt: "2025-03-05T10:15:30.500+00:00",
      updatedAt: "2025-03-05T10:15:30.500+00:00"
    },
    {
      _id: "67c736422c512fd19efd5",
      email: "priya@gmail.com",
      fullName: "Priya Sharma",
      profilePic: "priya_pic.jpg",
      createdAt: "2025-03-06T12:00:00.000+00:00",
      updatedAt: "2025-03-06T12:00:00.000+00:00"
    },
    {
      _id: "67c736422c512fd19efd6",
      email: "rahul@gmail.com",
      fullName: "Rahul Verma",
      profilePic: "",
      createdAt: "2025-03-07T08:30:45.200+00:00",
      updatedAt: "2025-03-07T08:30:45.200+00:00"
    },
    {
      _id: "67c736422c512fd19efd7",
      email: "meena@gmail.com",
      fullName: "Meena Gupta",
      profilePic: "meena_pic.jpg",
      createdAt: "2025-03-08T14:25:10.300+00:00",
      updatedAt: "2025-03-08T14:25:10.300+00:00"
    },
    {
      _id: "67c736422c512fd19efd8",
      email: "vikas@gmail.com",
      fullName: "Vikas Rao",
      profilePic: "vikas_pic.jpg",
      createdAt: "2025-03-09T09:10:20.100+00:00",
      updatedAt: "2025-03-09T09:10:20.100+00:00"
    },
    {
      _id: "67c736422c512fd19efd9",
      email: "neha@gmail.com",
      fullName: "Neha Singh",
      profilePic: "",
      createdAt: "2025-03-10T13:00:05.250+00:00",
      updatedAt: "2025-03-10T13:00:05.250+00:00"
    },
    {
      _id: "67c736422c512fd19efda",
      email: "ravi@gmail.com",
      fullName: "Ravi Kumar",
      profilePic: "ravi_pic.jpg",
      createdAt: "2025-03-11T16:45:30.900+00:00",
      updatedAt: "2025-03-11T16:45:30.900+00:00"
    },
    {
      _id: "67c736422c512fd19efdb",
      email: "kavita@gmail.com",
      fullName: "Kavita Yadav",
      profilePic: "",
      createdAt: "2025-03-12T11:20:40.600+00:00",
      updatedAt: "2025-03-12T11:20:40.600+00:00"
    },
    {
      _id: "67c736422c512fd19efdc",
      email: "arjun@gmail.com",
      fullName: "Arjun Patel",
      profilePic: "arjun_pic.jpg",
      createdAt: "2025-03-13T18:30:00.000+00:00",
      updatedAt: "2025-03-13T18:30:00.000+00:00"
    }
  ];
  

export const THEMES = [ 
  "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",]