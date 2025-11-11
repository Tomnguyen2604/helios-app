const VoiceToggle = ({ enabled, onToggle }) => (
  <div className="voice-toggle">
    <label>
      <input type="checkbox" checked={enabled} onChange={onToggle} />
      🔊 Voice Alerts
    </label>
  </div>
);

export default VoiceToggle;