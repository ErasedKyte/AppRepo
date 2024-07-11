// tailwind.config.js

module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        acquisition: '#1E3A8A', // Example color for Acquisition
        approval: '#1E3A8A', // Example color for Approval
        civil: '#1E3A8A', // Example color for Civil
        ti: '#1E3A8A', // Example color for TI
        handover: '#1E3A8A', // Example color for On Air and Handover
      },
    },
  },
  plugins: [],
};
