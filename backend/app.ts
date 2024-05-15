import router  from './services/router'
import 'dotenv/config'


const app = router()
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})