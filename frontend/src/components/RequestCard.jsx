import { FileText, Send } from "lucide-react";

export default function RequestCard({
  requestId,
  setRequestId,
  requestRecommendation,
}) {
  return (
    <div className="glass-card">
      <h2>📄 Request Recommendation</h2>

      <div className="input-box">
        <FileText size={18} />
        <input
          type="number"
          placeholder="Student ID"
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
        />
      </div>

      <button className="primary-btn" onClick={requestRecommendation}>
        <Send size={18} />
        <span>Request</span>
      </button>
    </div>
  );
}