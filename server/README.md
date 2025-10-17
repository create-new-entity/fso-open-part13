

<ol>
    <li>Run docker compose -f docker-compose.dev.yml up --build from inside server folder.</li>
    <li>
        Save followings in .env inside server folder:
        <ul>
            <li>
                PORT=Some port here
            </li>
            <li>
                POSTGRESQL_URL=postgresql://YOUR USERNAME HERE:YOUR PASSWORD HERE@localhost:5432/YOUR DATABASE NAME HERE
            </li>
        </ul>
    </li>
</ol>