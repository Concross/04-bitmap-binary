In your README.md describe the exported values of each module you have defined. Every function description should include it's airty (expected number of paramiters), the expected data for each paramiter (data-type and limitations), and it's behavior (for both valid and invalued use). Feel free to write any additional information in your README.md.


# Bitmap Transform

## Transforms

### Invert
- Expects a `bitmap` buffer and a `callback()`
- Inverts the rgb values of each pixel

### Darken
- Expects a `bitmap` buffer and a `callback()`
- Decreases each rgb value by a factor of 4 to darken the bitmap image

### Lighten
- Expects a `bitmap` buffer and a `callback()`
- Increases the rgb value by 55 up to 255 for each pixel

### Pixel Burst
- Expects a `bitmap` buffer and a `callback()`
- Squares each rgb value

### Flip and Invert
- Expects a `bitmap` buffer and a `callback()`
- Flips/mirrors the image, and inverts the colors
