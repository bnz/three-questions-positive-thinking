/** @type {import("tailwindcss").Config} */
module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{html,js,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
            },
        },
    },
    plugins: [],
}

