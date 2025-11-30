#!/usr/bin/env python3
"""
Download Instagram images from data.json and save them locally
"""

import json
import os
import requests
from urllib.parse import urlparse
import time
import sys

def download_image(url, filename):
    """Download an image from URL and save it to filename"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        
        with open(filename, 'wb') as f:
            f.write(response.content)
        
        print(f"✓ Downloaded: {filename}")
        return True
        
    except Exception as e:
        print(f"✗ Failed to download {url}: {str(e)}")
        return False

def main():
    # Paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(script_dir)
    data_file = os.path.join(project_dir, 'public', 'amplify_data', 'data.json')
    images_dir = os.path.join(project_dir, 'public', 'instagram_images')
    
    # Create images directory
    os.makedirs(images_dir, exist_ok=True)
    
    # Load data
    print(f"Loading data from: {data_file}")
    with open(data_file, 'r') as f:
        posts = json.load(f)
    
    print(f"Found {len(posts)} posts")
    
    # Download images
    total_images = 0
    downloaded_images = 0
    updated_posts = []
    
    for i, post in enumerate(posts):
        print(f"\nProcessing post {i+1}/{len(posts)}: {post['id']}")
        
        # Update displayUrl
        if post.get('displayUrl'):
            total_images += 1
            original_url = post['displayUrl']
            filename = f"post_{post['id']}_display.jpg"
            filepath = os.path.join(images_dir, filename)
            
            if download_image(original_url, filepath):
                post['displayUrl'] = f"./instagram_images/{filename}"
                downloaded_images += 1
            
            time.sleep(0.5)  # Be nice to the server
        
        # Update images array
        local_images = []
        for j, img_url in enumerate(post.get('images', [])):
            total_images += 1
            filename = f"post_{post['id']}_img_{j}.jpg"
            filepath = os.path.join(images_dir, filename)
            
            if download_image(img_url, filepath):
                local_images.append(f"./instagram_images/{filename}")
                downloaded_images += 1
            else:
                local_images.append(img_url)  # Keep original if download fails
            
            time.sleep(0.5)  # Be nice to the server
        
        post['images'] = local_images
        updated_posts.append(post)
    
    # Save updated data
    output_file = os.path.join(project_dir, 'public', 'amplify_data', 'data_with_local_images.json')
    with open(output_file, 'w') as f:
        json.dump(updated_posts, f, indent=2)
    
    print(f"\n🎉 Download complete!")
    print(f"📊 Downloaded {downloaded_images}/{total_images} images")
    print(f"💾 Updated data saved to: data_with_local_images.json")
    print(f"📁 Images saved to: {images_dir}")

if __name__ == "__main__":
    main()