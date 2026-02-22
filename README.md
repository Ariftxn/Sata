🛡️ Sata: Advanced Discord Administrative Bot & Web Dashboard
Sata is a high-performance, all-in-one Discord management ecosystem. It bridges the gap between complex server administration and user-friendly control by integrating a powerful Discord bot with a sleek, real-time web dashboard.
✨ Key Features
🌐 Sophisticated Web Dashboard
Real-time Synchronization: Powered by WebSockets, any configuration changes (like prefixes or settings) are updated instantly without requiring a bot restart.
Modern "Lobby" UI: A clean, grid-based layout using Glassmorphism design principles, featuring smooth animations and a premium aesthetic.
Intuitive Configuration: No more manual ID copying. Use Smart Dropdowns to select Channels and Roles fetched directly from your server.
Unified Activity Feed: Every bot interaction is logged in a dedicated section of the dashboard, separated into distinct views for clarity.
🤖 Core Administration
Dual-Command Support: Fully compatible with both traditional Custom Prefixes (default: .) and modern Slash Commands.
Categorized Help System: An organized .help menu that automatically updates and classifies commands into Admin, Moderation, Utility, and Leveling.
Insightful Intelligence: Deep-dive into member data (join dates, roles, IDs) and comprehensive server statistics.
🎫 Voucher & Economy System
Voucher Generator: Create custom or auto-generated (12-character alphanumeric) codes to grant specific roles.
Seamless Redemption: A simple .redeem <code> command for users to claim their rewards instantly.
Management Table: A professional administrative table on the dashboard to track code usage and status.
⚖️ Moderation & Leveling
Professional Moderation: Includes warn, kick, ban, and mute (with auto-role assignment) integrated with centralized logging.
XP Engine: Automated XP accumulation per message with a global leaderboard and setlevelrole features for automated rank progression.
🎨 Engagement & Automation
Visual Welcome/Goodbye: Configure entry and exit messages via the web dashboard with built-in image manipulation (Zoom/Crop).
Reaction Roles: Setup automated role assignment via emoji reactions or dropdown menus through the web interface.
🛠️ Technical Stack
Framework: Discord.js v14+
Backend: Node.js & Express.js
Frontend: React.js / Next.js with Tailwind CSS & Framer Motion
Real-time: Socket.io
Database: MongoDB & Local JSON storage for history/logs
📁 Project Structure
Optimized for easy deployment and organized hosting:
/Sata
├── /bot        # Core bot logic & command handlers
├── /web        # Modern dashboard frontend
├── /server     # Express API & WebSocket bridge
└── /data       # Centralized history and configuration storage
