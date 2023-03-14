# speedykom-searcher-ui
A simple web app that enable users to register, login and search for health related topics and a couple of articles to read

## Built With

- Nextjs
- Axios
- Docker
- Tailwindcss

## Getting Started

- **To get a local copy of the repository please run the following commands on your terminal:**
   - `git clone git@github.com:mmsesay/speedykom-searcher-ui.git`
   - `cd speedykom-searcher-ui`
   - `yarn install` or `npm install` to install packages
   - `yarn dev` or `npm run dev` to local dev server

- **Please run the following commands on your terminal to start the app using docker:**

  - Please ensure you have docker installed and is running.
  - Please ensure you have cloned the project and navigate to the root directory via the terminal
  - Use `docker build -t searcher-ui .` in your ternimal and press enter
  - Use `docker images` to verify you see the image being created
  - Use `docker run -p 3000:3000 searcher-ui` to start the app. You can add `-d` flag to the command to run on detach mode.
  - Finally, open your browser and interact with the app.

## Author

👤 **Muhammad Sesay**

- GitHub: [@mmsesay](https://github.com/mmsesay)
- Twitter: [@DeeMaejor](https://twitter.com/DeeMaejor)
- LinkedIn: [LinkedIn](https://linkedin.com/in/muhammad-m-sesay)


## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments
- Datasource from [Health.gov](https://health.gov/our-work/national-health-initiatives/health-literacy/consumer-health-content/free-web-content/apis-developers/api-documentation)

