import { AppDataSource } from "../data-source";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";

async function create() {
  const id = uuidV4();
  const password = await hash("admin", 8);

  await AppDataSource.initialize();

  await AppDataSource.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, "driverLicense" )
      values('${id}', 'admin', 'admin@rentalx.com', '${password}', true, 'now()', 'XXXXXX')
    `,
  );

  await AppDataSource.destroy();
}

create().then(() => console.log("User admin created!"));
