for file in membres/*.jpg; do
  echo "Compressing $file"
  guetzli "$file" "$file"
done
