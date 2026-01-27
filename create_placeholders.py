from PIL import Image, ImageDraw
import os

os.chdir(r"c:\Users\sagar\rehan\TV-Website\public\assets\gallery")

# Create 4 simple placeholder images with different colors and text
colors = [
    ((25, 80, 120), "Placeholder 1"),   # Dark blue
    ((120, 40, 40), "Placeholder 2"),   # Dark red
    ((40, 100, 40), "Placeholder 3"),   # Dark green
    ((100, 60, 20), "Placeholder 4"),   # Dark brown
]

for i, (bg_color, text) in enumerate(colors, 1):
    # Create image
    img = Image.new('RGB', (400, 300), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Add text centered
    text_bbox = draw.textbbox((0, 0), text)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    x = (400 - text_width) // 2
    y = (300 - text_height) // 2
    
    draw.text((x, y), text, fill=(200, 200, 200))
    
    # Save image
    img.save(f'placeholder-{i}.jpg', 'JPEG', quality=85)
    print(f"Created placeholder-{i}.jpg")

print("All placeholder images created successfully!")
