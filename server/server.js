import express from 'express'
import cors from 'cors'

import tripRoutes from './routes/trips.js'
import activityRoutes from './routes/activities.js'
import destinationRoutes from './routes/destinations.js'
import tripDestinationRoutes from './routes/trips_destinations.js'
import userTripRoutes from './routes/users_trips.js'

import passport from 'passport'
import session from 'express-session'
import { GitHub } from './config/auth.js'
import authRoutes from './routes/auth.js'

const app = express()

app.use(session({
  secret: 'd5381990451ef27fa941',
  resave: false,
  saveUninitialized: true
}))

const CLIENT_URL = process.env.NODE_ENV === 'production' ? 'https://ontheflyclient.up.railway.app' : 'http://localhost:3000'

app.use(express.json())
app.use(cors({
  origin: CLIENT_URL,
  methods: 'GET,POST,PUT,DELETE,PATCH',
  credentials: true
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(GitHub)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

app.get('/', (req, res) => {
  res.redirect(CLIENT_URL)
})

// authentication routes
app.use('/auth', authRoutes)

// app routes
app.use('/api/trips', tripRoutes)
app.use('/api/activities', activityRoutes)
app.use('/api/destinations', destinationRoutes)
app.use('/api/trips-destinations', tripDestinationRoutes)
app.use('/api/users-trips', userTripRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
})