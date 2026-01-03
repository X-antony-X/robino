import { motion } from "framer-motion";

function ImageGallery({ images, duration = 0.6, stagger = 0.1 }) {
  return (
    <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {images.map((img, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: duration / 1000,
            delay: index * (stagger / 1000),
            ease: "easeOut",
          }}
          className="relative overflow-hidden rounded-xl group"
        >
          <img
            src={img.image}
            alt={img.alt}
            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* overlay للنص يطلع من تحت */}
          <div className="absolute bottom-0 left-0 w-full p-4 bg-black bg-opacity-40 transform translate-y-full group-hover:translate-y-0 group-active:translate-y-0  transition-transform duration-300 rounded-lg">
            <p className="text-white text-center">{img.alt}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default ImageGallery;
