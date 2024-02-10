# AllIn
This web application serves as a centralized hub for managing and storing information about video games. Equipped with CRUD operations, filters, search functionality, and more, it simplifies the handling of video game data.
Explore, create, and organize video game information effortlessly.
![AllinHome](https://github.com/Brayanl0-o/AllInSite_Angular/assets/107898232/7524ae27-652f-4c3a-8028-6d326cdf1421)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.


(Reference images: https://drive.google.com/drive/folders/1_hF-MOuBDu8IruCoyOVoeoA92BjOJorg?usp=drive_link)

## Technologies
- Angular   • TypeScript   
- Tailwind.css • Flowbite

## Functionalities

#### Video Games Section:
  - Explore a curated list of video games, complete with individual pages offering in-depth details, requirements, and video trailers.
  - Use filters to navigate effortlessly based on criteria such as qualification, developer, platforms, genre, rating, and release date.
  - Conduct instant searches for specific games using a dedicated input field.
  - Perform CRUD operations, allowing administrators to create, modify, and delete games.

#### Authentication and Authorization:
  - Practice secure login and user management using JSON Web Tokens (JWT).
  - Enable user registration with email and password, including password recovery functionality.
  - Implement role-based access control to protect sensitive operations, ensuring only administrators can edit, delete, or create games.

#### User Profiles:
  - Every registered user has a personalized profile, showcasing basic information and a customizable description.
  - Users can change their profile images for a personalized touch.

#### Image Management:
  - Optimize image loading through a backend controller, involving compression and resizing.
Serve and store images efficiently within specific API folders, ensuring optimal site performance.

## Installation
1. Clone the repository to your local machine.
  $ git clone https://github.com/Brayanl0-o/AllInSite_Angular.git

2. Navigate to the project directory.
```bash
  $ cd AllInSite_Angular
```

3. You can change the project's origin with the following commands.
```bash
  $ git remote -v
  $ git remote remove origin
  $ git remote add origin <new_repository_url>
```
5. Install the necessary dependencies. Make sure you have both package.json and package-lock.json in the root of the folder, and then execute:
```bash
  $ npm i
```
## Tailwind Installation
1. In a terminal, copy and paste: ` npm install -D tailwindcss`
   
2. Check if the tailwind.config.js file is installed.
3. Initialize with: `npx tailwindcss init`
4. In the main style.css, ensure it contains the following:
  `@tailwind base; `
  `@tailwind components;`
  `@tailwind utilities;`
  
  

