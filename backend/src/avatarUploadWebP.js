import multer from 'multer';
import sharp from 'sharp';

// Use in-memory storage so we can process and convert images
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max (increased for WebP processing)
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files allowed!'), false);
    }
  }
});

/**
 * Middleware to process and optimize uploaded images
 * Converts images to WebP format with compression
 */
export const processImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    // Process image with Sharp
    const processedImageBuffer = await sharp(req.file.buffer)
      .resize(512, 512, {
        fit: 'cover',
        position: 'center'
      })
      .webp({
        quality: 80,
        effort: 4
      })
      .toBuffer();

    // Update the file object with processed image
    req.file.buffer = processedImageBuffer;
    req.file.mimetype = 'image/webp';
    req.file.originalname = req.file.originalname.replace(/\.[^/.]+$/, ".webp");

    next();
  } catch (error) {
    console.error('Image processing error:', error);
    return res.status(500).json({ error: 'Failed to process image' });
  }
};

/**
 * Process image for household avatar uploads
 * Larger size for house avatars
 */
export const processHouseAvatar = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    // Process house avatar with larger dimensions
    const processedImageBuffer = await sharp(req.file.buffer)
      .resize(256, 256, {
        fit: 'cover',
        position: 'center'
      })
      .webp({
        quality: 85,
        effort: 4
      })
      .toBuffer();

    // Update the file object with processed image
    req.file.buffer = processedImageBuffer;
    req.file.mimetype = 'image/webp';
    req.file.originalname = req.file.originalname.replace(/\.[^/.]+$/, ".webp");

    next();
  } catch (error) {
    console.error('House avatar processing error:', error);
    return res.status(500).json({ error: 'Failed to process house avatar' });
  }
};

/**
 * Utility function to convert buffer to optimized data URL
 */
export const bufferToDataUrl = (buffer, mimeType = 'image/webp') => {
  const base64 = buffer.toString('base64');
  return `data:${mimeType};base64,${base64}`;
};

/**
 * Utility function to validate image dimensions
 */
export const validateImageDimensions = async (buffer, maxWidth = 2048, maxHeight = 2048) => {
  try {
    const metadata = await sharp(buffer).metadata();
    return metadata.width <= maxWidth && metadata.height <= maxHeight;
  } catch (error) {
    return false;
  }
};

export default upload;