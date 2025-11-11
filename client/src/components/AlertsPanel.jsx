const AlertsPanel = ({ alerts }) => (
  <div className="alerts">
    <h3>📢 Alerts</h3>
    <ul>
      {alerts.map((alert, i) => <li key={i}>{alert}</li>)}
    </ul>
  </div>
);

export default AlertsPanel;