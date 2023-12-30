import { useState, useEffect } from 'react'
import { supabase } from './backend/supabaseClient'
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@mui/material/styles';
import { Button } from '@material-ui/core';
import Box from '@mui/system/Box';


const useStyles = makeStyles(theme => ({
  button: {

    backgroundColor: theme.palette.blue.main,
  },
  bgcolor: '#5ca4a9'
}))

export default function Account() {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  const classes = useStyles()
 const theme = useTheme()

  useEffect((username) => {
    let ignore = false
    async function getProfile() {
      setLoading(true)

      const { data, error } = await supabase
        .from('categoria')
        .select(`nombre`)
        .eq('id_categoria', 1)
        .single()

      if (!ignore) {
        if (error) {
          console.warn(error)
        } else if (data) {
          setUsername(data.nombre)
          setWebsite(data.website)
          setAvatarUrl(data.avatar_url)
        }
      }

      setLoading(false)
    }

    getProfile()

    return () => {
      ignore = true
    }
  }, [username])

  async function updateProfile(event, avatarUrl) {
    event.preventDefault()

    setLoading(true)
    const { user } = username

    const updates = {
      id: user.id,
      username,
      website,
      avatar_url,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    } else {
      setAvatarUrl(avatarUrl)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={updateProfile} className="form-widget">
      <div>yo</div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={username} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          required
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="url"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button className="button block primary"  type="submit" disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button color='primary' type="button" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
        <Button className={classes.button}>y</Button>
        <Box className={classes.bgcolor} component="section" sx={{ p: 2, border: '1px dashed primary.main', bgcolor:'primary' }}>
      This is a section container
    </Box>      </div>
    </form>
  )
}