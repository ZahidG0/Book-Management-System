import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-32 w-full">
            <motion.div
                className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                    borderRadius: ["50%", "30%", "50%"],
                }}
                transition={{
                    duration: 3000,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                0
            </motion.div>
        </div>
    );
};

export default Loading;
