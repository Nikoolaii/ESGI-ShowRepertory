# Typescript - ShowTracker #

<p align="center">
   <strong>An application to track your shows and your movie.</strong>
   <strong>First project with VueJS and Typescript.</strong>
</p>

<details>
  <summary><strong>➡️ Screenshots</strong></summary>
  <br/>
  <img align="left" src="https://github.com/Nikoolaii/ESGI-ShowTracker/blob/main/imgs/st_1.jpeg" width="280" target="_blank"/>
  <img src="https://github.com/Nikoolaii/ESGI-ShowTracker/blob/main/imgs/st_2.jpeg" width="280" target="_blank"/>
  <br/>
  <img align="left" src="https://github.com/Nikoolaii/ESGI-ShowTracker/blob/main/imgs/st_3.jpeg" width="280" target="_blank"/>
</details>

### Features 🚀

- 🌐 **Get movie and show information**

- 🔄 **Create an account**

- 📊 **Set a movie or a show episode as seen**

- ✏️ **Made a movie or a show as a favorite**

## Prerequisites for installation 🛠️

- Node (Work with v18)
- MariaDB 10.10.X
- An API key from [The Movie Database](https://www.themoviedb.org/)

## How to Run the Project ▶️

1. Clone this repository to your local machine.
2. Create a database
3. Complete the `backend/env_template` file and rename it to `backend/.env`
4. Start the backend server with the following commands:
   ```bash
   cd backend
   npm install
   npx prisma migrate dev
   npm run dev
   ```
5. Start the frontend server with the following commands:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Authors ✨

[@Nikoolaii](https://github.com/Nikoolaii)

## License 📄

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.