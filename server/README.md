

<ol>
    <li>Run docker compose -f docker-compose.dev.yml up --build from inside server folder.</li>
    <li>
        Save followings in .env inside server folder:
        <ul>
            <li>
                PORT=Some port here
            </li>
            <li>
                POSTGRESQL_URL=postgresql://myusername:mypassword@localhost:5432/blog_database
            </li>
        </ul>
    </li>
</ol>