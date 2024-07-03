import routerService from './services/router-service'
import 'dotenv/config'


const app = routerService()
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})