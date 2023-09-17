mkdir membres  # Create a directory to store the resized images (if it doesn't exist)
for file in membres_originales/*.jpg; do
  filename=$(basename "$file")  # Extract the filename
  convert "$file" -resize 226x350^ -gravity center -extent 226x350 "membres/$filename"
done
