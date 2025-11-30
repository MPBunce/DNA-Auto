import json
import os
import requests
from pathlib import Path
from urllib.parse import urlparse
import time

def sanitize_filename(filename):
    """Remove invalid characters from filename"""
    invalid_chars = '<>:"/\\|?*'
    for char in invalid_chars:
        filename = filename.replace(char, '')
    return filename[:100]  # Limit length

def download_image(url, filepath):
    """Download image from URL to filepath"""
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        with open(filepath, 'wb') as f:
            f.write(response.content)
        print(f"  ✓ Downloaded: {filepath.name}")
        return True
    except Exception as e:
        print(f"  ✗ Failed to download {url}: {e}")
        return False

def download_video(url, filepath):
    """Download video from URL to filepath"""
    return download_image(url, filepath)  # Same logic

def process_post(post, posts_dir):
    """Process a single Instagram post"""
    post_id = post.get('id', 'unknown')
    short_code = post.get('shortCode', post_id)
    
    # Create post folder
    post_folder = posts_dir / short_code
    post_folder.mkdir(exist_ok=True)
    
    print(f"\nProcessing post: {short_code}")
    
    # Download main images
    images = post.get('images', [])
    downloaded_images = []
    
    for idx, img_url in enumerate(images):
        if img_url:
            ext = '.jpg'  # Default to jpg
            img_filename = f"image_{idx + 1}{ext}"
            img_path = post_folder / img_filename
            
            if download_image(img_url, img_path):
                downloaded_images.append(img_filename)
            
            time.sleep(0.5)  # Be nice to the server
    
    # Download video if exists
    video_url = post.get('videoUrl')
    video_filename = None
    if video_url:
        video_filename = "video.mp4"
        video_path = post_folder / video_filename
        if download_video(video_url, video_path):
            print(f"  ✓ Downloaded video: {video_filename}")
        time.sleep(0.5)
    
    # Process child posts (carousel items)
    child_posts = post.get('childPosts', [])
    for child_idx, child in enumerate(child_posts):
        child_images = child.get('images', [])
        for img_idx, img_url in enumerate(child_images):
            if img_url:
                ext = '.jpg'
                img_filename = f"child_{child_idx + 1}_image_{img_idx + 1}{ext}"
                img_path = post_folder / img_filename
                
                if download_image(img_url, img_path):
                    downloaded_images.append(img_filename)
                
                time.sleep(0.5)
        
        # Download child video if exists
        child_video_url = child.get('videoUrl')
        if child_video_url:
            child_video_filename = f"child_{child_idx + 1}_video.mp4"
            child_video_path = post_folder / child_video_filename
            if download_video(child_video_url, child_video_path):
                downloaded_images.append(child_video_filename)
            time.sleep(0.5)
    
    # Create metadata JSON
    metadata = {
        "id": post_id,
        "shortCode": short_code,
        "caption": post.get('caption', ''),
        "likesCount": post.get('likesCount', 0),
        "commentsCount": post.get('commentsCount', 0),
        "timestamp": post.get('timestamp', ''),
        "url": post.get('url', ''),
        "folder_path": str(post_folder),
        "downloaded_files": downloaded_images,
        "video_file": video_filename,
        "hashtags": post.get('hashtags', []),
        "mentions": post.get('mentions', []),
        "locationName": post.get('locationName'),
        "ownerUsername": post.get('ownerUsername', '')
    }
    
    # Save metadata
    metadata_path = post_folder / 'metadata.json'
    with open(metadata_path, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, indent=2, ensure_ascii=False)
    
    print(f"  ✓ Saved metadata to: metadata.json")
    print(f"  Total files downloaded: {len(downloaded_images)}")
    
    return metadata

def main():
    # Read the input JSON file
    input_file = 'instagram_posts.json'
    
    if not os.path.exists(input_file):
        print(f"Error: {input_file} not found!")
        print("Please make sure your JSON file is named 'instagram_posts.json' and is in the same directory.")
        return
    
    # Load JSON data
    print("Loading Instagram posts data...")
    with open(input_file, 'r', encoding='utf-8') as f:
        posts = json.load(f)
    
    print(f"Found {len(posts)} posts to process")
    
    # Create posts directory
    posts_dir = Path('posts')
    posts_dir.mkdir(exist_ok=True)
    
    # Process each post
    all_metadata = []
    for idx, post in enumerate(posts, 1):
        print(f"\n{'='*60}")
        print(f"Post {idx}/{len(posts)}")
        print(f"{'='*60}")
        
        try:
            metadata = process_post(post, posts_dir)
            all_metadata.append(metadata)
        except Exception as e:
            print(f"  ✗ Error processing post: {e}")
            continue
    
    # Create master index file
    index_path = posts_dir / 'index.json'
    with open(index_path, 'w', encoding='utf-8') as f:
        json.dump(all_metadata, f, indent=2, ensure_ascii=False)
    
    print(f"\n{'='*60}")
    print(f"✓ Complete! Processed {len(all_metadata)} posts")
    print(f"✓ All files saved to: {posts_dir.absolute()}")
    print(f"✓ Master index saved to: {index_path.absolute()}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()