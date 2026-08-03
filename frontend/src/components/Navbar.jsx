import { GraduationCap, Wallet } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar({ account, connectWallet }) {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="logo">
        <GraduationCap size={38} />
        <div>
          <h2>Letter of Recommendation</h2>
          <p>Blockchain University Portal</p>
        </div>
      </div>

      {account ? (
        <div className="wallet-box">
          <Wallet size={18} />
          {account.slice(0, 6)}...{account.slice(-4)}
        </div>
      ) : (
        <button className="connect-btn" onClick={connectWallet}>
          <Wallet size={18} />
          Connect MetaMask
        </button>
      )}
    </motion.nav>
  );
}