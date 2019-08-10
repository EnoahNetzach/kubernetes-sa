import React, { useEffect, useMemo, useRef, useState } from 'react'
import rgbToHex from 'rgb-hex'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import AddCircle from '@material-ui/icons/AddCircle'
import Album from '@material-ui/icons/Album'
import RemoveCircle from '@material-ui/icons/RemoveCircle'

const apiUrl = process.env.REACT_APP_SA_API_URL

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  send: {
    margin: theme.spacing(3, 0, 2),
  },
}))

function getSentimentIcon(polarity) {
  if (polarity >= 0.25) {
    return AddCircle
  } else if (polarity <= -0.25) {
    return RemoveCircle
  }

  return Album
}

const lerpRGB = (a, b, t) => [a.r + (b.r - a.r) * t, a.g + (b.g - a.g) * t, a.b + (b.b - a.b) * t]

export default function App() {
  const [sentence, setSentence] = useState('')
  const [sentiment, setSentiment] = useState(0)
  const [loading, setLoading] = useState(false)
  const handleSubmit = useRef(() => {})
  const classes = useStyles()

  useEffect(() => {
    let cancelled = false

    handleSubmit.current = async () => {
      if (!cancelled && sentence.length > 0) {
        setLoading(true)

        const result = await fetch(`${apiUrl}/sentiment`, {
          body: JSON.stringify({
            sentence,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        const data = await result.json()

        if (!cancelled) {
          setLoading(false)
          setSentiment(parseFloat(data.polarity) || 0)
        }
      }
    }

    return () => {
      cancelled = true
    }
  }, [sentence])

  const sentimentColor = useMemo(
    () => rgbToHex(...lerpRGB({ r: 255, g: 40, b: 10 }, { r: 0, g: 90, b: 180 }, (sentiment + 1) / 2)),
    [sentiment],
  )

  const SentimentIcon = getSentimentIcon(sentiment)

  return (
    <>
      <CssBaseline />

      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar} style={{ backgroundColor: loading ? undefined : `#${sentimentColor}` }}>
            {loading ? <CircularProgress /> : <SentimentIcon />}
          </Avatar>

          <Typography component="h1" variant="h5">
            Sentiment Analyser
          </Typography>

          <form
            className={classes.form}
            noValidate
            onSubmit={event => {
              event.preventDefault()
              handleSubmit.current()
            }}
          >
            <TextField
              autoComplete="off"
              autoFocus
              fullWidth
              id="sentence"
              label="Sentence "
              margin="normal"
              multiline
              name="sentence"
              onChange={event => setSentence(event.target.value)}
              onKeyDown={event => {
                if (event.key === 'Enter' && event.shiftKey) {
                  event.preventDefault()
                  handleSubmit.current()
                }
              }}
              required
              value={sentence}
              variant="outlined"
            />

            <Button className={classes.send} color="primary" fullWidth type="submit" variant="contained">
              Analyse
            </Button>
          </form>
        </div>
      </Container>
    </>
  )
}
