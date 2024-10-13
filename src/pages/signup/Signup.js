import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// styles
import './Signup.css'
export default function Signup() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const { signup, isPending, error} = useSignup()

  const handleFileChange = (e) => {
    setThumbnail(null) // Reset the thumbnail state to null
  
    let selected = e.target.files[0] // `selected` will be the first file from the input
  
    console.log(selected); // Log the selected file to see what it contains
  
    // Explanation:
    // - `!selected` will evaluate to true when no file is selected from the file input.
    //   - This happens when the user either doesn't select a file or cancels the file dialog.
    //   - `e.target.files` will be an empty FileList in this case, and `e.target.files[0]` will be `undefined`.
    if (!selected) {
      setThumbnailError('Please select a file') // Show an error message when no file is selected
      return // Exit the function, since there's no file to process
    }
  
    // Check if the selected file is NOT an image
    // `selected.type` will return the MIME type of the file (e.g., 'image/png' or 'image/jpeg')
    // If the MIME type does not include 'image', it's not an image file
    if (!selected.type.includes('image')) {
      setThumbnailError('Selected file must be an image') // Set an error if the file is not an image
      return // Exit the function as the file is invalid
    }
  
    // Check if the selected file size is greater than 100KB
    // `selected.size` gives the file size in bytes, so 100KB = 100,000 bytes
    // `selected.size > 100000` evaluates to true if the file size exceeds 100KB
    if (selected.size > 100000) { // This condition checks if the file size exceeds 100KB
      setThumbnailError('Image file size must be less than 100kb') // Set an error if the file is too large
      return // Exit the function as the file size is invalid
    }
  
    // If all the checks pass, reset any existing thumbnail error and set the selected file as the thumbnail
    setThumbnailError(null) // Clear any previous error
    setThumbnail(selected) // Update the thumbnail state with the selected file
    console.log('Thumbnail updated'); // Log to confirm the thumbnail is updated
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, thumbnail);
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>email:</span>
        <input
          required 
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email} 
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required 
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password} 
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          required 
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName} 
        />
      </label>
      <label>
        <span>profile thumbnail:</span>
        <input
          required 
          type="file"
          onChange={handleFileChange}
        />
        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>
      {!isPending && <button className='btn'>Sign up</button>}
      {isPending && <button className='btn' disabled>Signing up...</button>}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}
