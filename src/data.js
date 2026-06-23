export const TOOLS = ['BigQuery', 'Apache Airflow', 'dbt', 'Python', 'PySpark', 'SQL', 'Cloud Composer', 'GCP', 'AWS Glue', 'Snowflake', 'Spark', 'Power BI', 'Databricks', 'GitHub Actions']

export const WORK = [
  {
    slug: 'observability-alerting', cat: 'Observability', title: 'Cut alert response from 45 minutes to under 5', desc: 'Monitoring that catches failures before anyone files a ticket.',
    ctx: 'NAF Data Foundation · General Mills', client: 'General Mills', video: '', poster: '', repo: '', live: '', badges: ['45m → <5m', 'MTTR ↓ 30-40%'],
    problem: 'Critical pipelines were failing quietly. The team usually found out from a broken dashboard, often 45 minutes too late. Recovery was reactive and slow.',
    solution: 'I engineered automated monitoring on the critical production DAGs with secure notifications, so the right person hears about a failure within minutes, with the context already attached.',
    outcome: 'Alert response dropped from about 45 minutes to under 5. Mean time to recovery improved 30 to 40 percent. Failures turned into events instead of surprises.',
  },
  {
    slug: 'plm-migration', cat: 'Cloud Migration', title: 'Migrated 5+ TB to a new platform without losing a row', desc: 'Six SAP datasets to Optiva, not a row lost.',
    ctx: 'PET ITQ-PLM Migration · General Mills', client: 'General Mills', video: '', poster: '', repo: '', live: '', badges: ['5+ TB', 'Zero loss', 'Latency ↓ 25%'],
    problem: 'Six SAP PLM datasets, more than 5 TB, had to move to Optiva. Manual handling was slow and risky, and any loss would corrupt the product data everything downstream relied on.',
    solution: 'I architected GCP ETL tracks with parameterized Airflow DAGs and reusable JSON ingestion layouts, validated with QA and product owners at every step.',
    outcome: 'Zero loss migration of all six datasets. Manual processing latency down 25 percent. Over 200 raw files a month now load on schedule, untouched by hand.',
  },
  {
    slug: 'data-quality-contracts', cat: 'Data Quality', title: 'Stopped bad data before it reached a report', desc: 'Fail-fast contracts that catch bad data at the gate.',
    ctx: 'Data Quality & Contracts · General Mills', client: 'General Mills', video: '', poster: '', repo: '', live: '', badges: ['8 fail-fast gates', '200-300 dups/mo blocked', 'Coverage ↑ 80%'],
    problem: 'Duplicate records and schema drift kept slipping into production. They surfaced only when a report looked wrong, and trust in the numbers was thinning.',
    solution: 'I deployed unit and generic dbt tests for schemas, types, and integrity, then wired eight fail-fast dbt Cloud jobs straight into the production DAGs so bad data fails loudly and early.',
    outcome: 'Between 200 and 300 duplicate records caught every month before they spread. Schema drift stopped at the gate. Detection coverage up 80 percent.',
  },
  {
    slug: 'supply-chain-ingestion', cat: 'Pipelines', title: 'Turned a week-long process into a same-day one', desc: 'Ingestion that adapts to messy inputs instead of breaking.',
    ctx: 'Supply-chain Ingestion · General Mills', client: 'General Mills', video: '', poster: '', repo: '', live: '', badges: ['1 week → <24h', 'Month-end ↓ 85%'],
    problem: 'High-volume supply-chain files took over a week to process. Month-end close dragged because everyone waited on them.',
    solution: 'I rebuilt ingestion with dynamic file parsing and schema-deviation logic, so the pipeline adapts to messy inputs instead of breaking on them.',
    outcome: 'Processing fell from over a week to under 24 hours. Month-end cycles cut by 85 percent.',
  },
  {
    slug: 'ai-onboarding-agents', cat: 'AI Engineering', title: 'Onboarded new distributors in days, not weeks', desc: 'Custom Claude agents that cut the manual grind.',
    ctx: 'AI-Assisted Engineering · General Mills', client: 'General Mills', video: '', poster: '', repo: '', live: '', badges: ['7wk → 2-3wk', 'Docs ↓ 90%'],
    problem: 'Bringing on a new distributor took around seven weeks, most of it manual requirement analysis and documentation that nobody enjoyed.',
    solution: 'I built custom Claude agents for requirement analysis and deployment planning, with an engineer kept in the loop for judgment calls.',
    outcome: 'Onboarding dropped to two or three weeks. Documentation overhead down 90 percent. Same quality, far less grind.',
  },
  {
    slug: 'bayer-cph-cdp', cat: 'Reliability', title: 'Steadied a healthcare data platform under strict SLAs', desc: 'Root-cause analysis and tuning that ended the firefighting.',
    ctx: 'Cyrus CPH-CDP · Bayer A.G.', client: 'Bayer', video: '', poster: '', repo: '', live: '', badges: ['SLAs met', 'Faster queries', 'Less firefighting'],
    problem: 'Production loads were failing and analytical queries were slow on a platform that analysts depended on, all under tight SLA pressure.',
    solution: 'I ran root-cause analysis on the failures, optimized AWS Glue ETL for high-volume batch loads, and tuned Snowflake queries for retrieval speed.',
    outcome: 'Platform health restored, SLA targets met, and the slow queries made fast. Far more uptime, far less firefighting.',
  },
]

export const TIMELINE = [
  { dates: 'current', title: 'NAF Data Foundation', org: 'General Mills', live: true, bullets: ['Built the canonical data layer on Airflow, dbt, and BigQuery that powers sales and supply-chain analytics.', 'Monitoring brought alert response to under 5 minutes and improved recovery time 30 to 40 percent.'] },
  { dates: 'Jun 2024 to Jan 2026', title: 'PET ITQ-PLM Data Migration', org: 'General Mills', live: false, bullets: ['Zero loss migration of 6+ SAP PLM datasets, over 5 TB, to Optiva, with latency down 25 percent.', 'Modeled 59+ core dbt models with GitHub CI/CD holding a 99.9 percent uptime record.'] },
  { dates: 'Mar 2023 to May 2024', title: 'Cyrus CPH-CDP, Healthcare Data Platform', org: 'Bayer A.G.', live: false, bullets: ['Optimized AWS Glue ETL for high-volume batch loads under strict SLA adherence.', 'Ran root-cause analysis on production failures and tuned Snowflake queries to restore health.'] },
  { dates: 'Mar 2022 to Feb 2023', title: 'Full-Stack Data Integration Intern', org: 'Cognizant', live: false, bullets: ['Built foundations in SQL, Python, Unix shell, and DBMS, with hands-on ETL in Informatica, Talend, and DataStage.'] },
]

export const CERTS = [
  { y: '2026', t: 'Claude Certified Architect: Foundations', o: 'Anthropic', img: 'https://www.google.com/s2/favicons?domain=anthropic.com&sz=128' },
  { y: '2025', t: 'Apache Airflow 3 Fundamentals', o: 'Astronomer', img: 'https://www.google.com/s2/favicons?domain=astronomer.io&sz=128' },
  { y: '2025', t: 'GitHub Copilot Certification', o: 'Microsoft', img: 'https://www.google.com/s2/favicons?domain=github.com&sz=128' },
  { y: '2024', t: 'Power BI Data Analyst Associate, PL-300', o: 'Microsoft', img: 'https://www.google.com/s2/favicons?domain=powerbi.microsoft.com&sz=128' },
  { y: '2024', t: 'The Complete SQL Bootcamp, Zero to Hero', o: 'Udemy', img: 'https://www.google.com/s2/favicons?domain=udemy.com&sz=128' },
]

export const STACK = [
  { group: 'Cloud & Warehouse', items: ['Google Cloud', 'BigQuery', 'Snowflake'] },
  { group: 'Orchestration & Transform', items: ['Apache Airflow', 'Cloud Composer', 'dbt'] },
  { group: 'Languages & Processing', items: ['Python', 'SQL', 'PySpark', 'Apache Spark'] },
  { group: 'Cloud Ops, BI & Version Control', items: ['AWS Glue', 'Power BI', 'GitHub Actions', 'Git'] },
]

export const ARTICLES = [
  {
    slug: "building-trust-through-data-contracts",
    date: "Jun 12, 2026",
    title: "Building Trust Through Clear Data Contracts",
    excerpt: "How data engineers can establish firm boundaries between ingestion and consuming applications to avoid silent pipeline failures and schema drift.",
    content: `
Data pipelines are often built on assumptions. We assume upstream services will always send data in the expected format, fields won't change, and duplicates won't slip through. When these assumptions break, our downstreams break.

### What is a Data Contract?

A data contract is a formal agreement between a data provider and a data consumer. It defines the structure, quality constraints, and SLA guarantees of the data being delivered.

### Why Implement Contracts?

1. **Schema Drift Protection**: If an upstream service adds or changes a field, a contract block stops the pipeline at the ingestion stage rather than allowing malformed data to pollute the warehouse.
2. **Clear Ownership**: It defines who is responsible when a pipeline breaks. If the contract is violated, the sender must fix it.
3. **Improved Collaboration**: Software engineers and data engineers are forced to align before API changes occur.

In my recent projects, introducing schema-validation blocks directly inside dbt models prevented massive data cleanup efforts downstream and restored trust in the dashboard reports.
`
  },
  {
    slug: "how-to-catch-schema-drift-in-production",
    date: "May 28, 2026",
    title: "Catching Schema Drift in Production Pipelines",
    excerpt: "Using Apache Airflow dynamic parser jobs and check-validation rules to prevent database corruption during high-volume batch loads.",
    content: `
Schema drift—when source database schemas change without warning—is the silent killer of production data pipelines. 

### The Traditional Approach: Let it Fail

Typically, a pipeline runs until a SQL query fails with a syntax error or a database rejects a record. By then, the engine has wasted computing resources, and engineers have to fire-fight to clean partially written rows.

### The Fail-Fast Approach

A more resilient pattern involves:
- **Pre-Ingestion Scans**: Run a brief metadata scan comparing the incoming source file format against a reference catalog.
- **Dynamic Ingestion Logic**: Using Python/Airflow parsing loops, dynamically map fields. If a new column is detected, either isolate the file in a quarantine bucket or create a warning log while continuing the load.
- **Automated Notifications**: Alert the team via Teams/Slack within minutes.

Implementing these schema check-gates during General Mills' Optiva migration reduced processing overhead and ensured 100% data integrity across 5+ TB of data.
`
  },
  {
    slug: "optimizing-bigquery-cost-and-partition-strategy",
    date: "Apr 15, 2026",
    title: "Optimizing BigQuery Cost and Partition Strategy",
    excerpt: "A practical guide to designing partition-smart tables and dbt incremental runs that cut data scan costs by up to 60%.",
    content: `
BigQuery is incredibly powerful, but its query-pricing model (based on bytes scanned) means inefficient query patterns can lead to unexpectedly high monthly bills.

### Partitioning vs. Clustering

- **Partitioning**: Splits a table into segments based on a date, timestamp, or integer column. BigQuery only scans the partition specified in the query filter.
- **Clustering**: Sorts the data inside each partition based on the values of one or more columns. It optimizes performance for filter and join queries.

### Incremental dbt Strategies

For large datasets, full-refresh dbt models are unsustainable. Incremental models process only the new rows since the last execution.
Using partition filters inside the \`is_incremental()\` macro ensures that dbt only updates affected partitions, preventing full table scans.

When structuring General Mills' data platform, using date-partitioned incremental tables lowered storage scan costs by 55% while maintaining fast response times for downstream Power BI reports.
`
  },
  {
    slug: "zero-loss-migration-of-multi-terabyte-datasets",
    date: "Mar 10, 2026",
    title: "Zero-Loss Migration of Multi-Terabyte Datasets",
    excerpt: "Lessons learned migrating 5+ TB of critical product data from legacy SAP environments to modern cloud warehouses under tight deadlines.",
    content: `
Migrating core operational data to the cloud is high-stakes. Any row lost or corrupted can cause product delays or incorrect inventory logs down the line.

### Key Migration Strategies

1. **Parity Checks**: Count checks and hash checks on every dataset at the source and target.
2. **Replayable Pipelines**: Build pipelines that can be run repeatedly without duplicating data (idempotency).
3. **Gradual Transition**: Run old and new systems in parallel for a validation window before shutting down legacy infrastructure.

Applying this structure during our recent PLM migration kept our systems running continuously and ensured zero data loss.
`
  },
  {
    slug: "automated-reliability-monitoring-airflow",
    date: "Feb 18, 2026",
    title: "Automated Reliability Monitoring with Airflow",
    excerpt: "How we implemented automated Airflow alerting callbacks to reduce MTTR from 45 minutes to under 5 minutes.",
    content: `
When critical reports fail, every minute counts. Manual error checking is a recipe for missed deadlines and unhappy stakeholders.

### Callback Functions

Airflow allows registering callbacks:
- \`on_failure_callback\`
- \`on_retry_callback\`

By writing a custom reusable callback that formats error stack traces and posts them to communication webhooks, we ensure the on-call engineer receives precise debugging info immediately.

This simple setup transformed our operational workflow from reactive firefighting to proactive resolution.
`
  },
  {
    slug: "generative-ai-agents-in-modern-ingestion",
    date: "Jan 05, 2026",
    title: "Generative AI Agents in Modern Ingestion Engineering",
    excerpt: "Integrating Claude 3.5 Sonnet and GitHub Copilot to accelerate requirement analysis and deployment planning.",
    content: `
GenAI tools are not just for writing boilerplate code. They can act as architectural partners in mapping out complex ingestion flows.

### Use Cases in Data Engineering

- **Requirement Mapping**: Feed legacy documentation or schema layouts to a LLM to automatically generate dbt files or Airflow task configs.
- **SQL Translation**: Accelerate migration by converting outdated legacy database procedures into clean modern SQL queries.

In our team, bringing Claude into the onboarding pipeline for new distributors cut the deployment timeline by over 50%.
`
  }
]

