import styles from "./page.module.css";

const stats = [
  { label: "Students", value: "1,204", trend: "+32 this week" },
  { label: "Teachers", value: "82", trend: "All online" },
  { label: "Parents", value: "1,032", trend: "78% engaged" },
  { label: "Coordinators", value: "12", trend: "Alerts enabled" },
];

const alerts = [
  { title: "Safety drill reminder", audience: "Students + Teachers", channel: "App + SMS" },
  { title: "Parent meeting invite", audience: "Parents", channel: "Email + App" },
  { title: "Wellbeing check-in", audience: "Coordinators", channel: "App" },
];

const activity = [
  { id: "1", actor: "Admin", action: "Published monthly feed note", time: "5m ago" },
  { id: "2", actor: "Coordinator", action: "Opened messaging channel", time: "18m ago" },
  { id: "3", actor: "Teacher", action: "Logged diary update", time: "1h ago" },
  { id: "4", actor: "Parent", action: "Acknowledged alert", time: "2h ago" },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>O&apos;Care Admin</p>
          <h1>Control center for every role</h1>
          <p className={styles.subhead}>
            Publish updates, trigger alerts, and keep students, teachers, parents, and coordinators in sync.
          </p>
        </div>
        <div className={styles.badge}>Web + mobile ready</div>
      </header>

      <main className={styles.main}>
        <section className={styles.grid}>
          {stats.map((item) => (
            <div key={item.label} className={styles.card}>
              <p className={styles.label}>{item.label}</p>
              <p className={styles.value}>{item.value}</p>
              <p className={styles.trend}>{item.trend}</p>
            </div>
          ))}
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.kicker}>Alerts</p>
              <h2>Cross-channel notifications</h2>
            </div>
            <button className={styles.primaryButton}>Compose alert</button>
          </div>
          <div className={styles.list}>
            {alerts.map((alert) => (
              <div key={alert.title} className={styles.listRow}>
                <div>
                  <p className={styles.title}>{alert.title}</p>
                  <p className={styles.meta}>{alert.audience}</p>
                </div>
                <span className={styles.tag}>{alert.channel}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.kicker}>Activity</p>
              <h2>Recent changes</h2>
            </div>
            <button className={styles.secondaryButton}>Export</button>
          </div>
          <div className={styles.table}>
            {activity.map((item) => (
              <div key={item.id} className={styles.tableRow}>
                <div className={styles.actor}>{item.actor}</div>
                <div className={styles.action}>{item.action}</div>
                <div className={styles.time}>{item.time}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
