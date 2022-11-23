from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
  message: str

class Account(BaseModel):
    id: int
    full_name: str
    email: str
    zipcode: int
    hashed_password: str

class AccountIn(BaseModel):
    full_name: str
    email: str
    zipcode: int
    password: str

class AccountOut(BaseModel):
    id: int
    full_name: str
    email: str
    zipcode: int

class AccountRepo:
    def get(self, email: str) -> Optional[Account]:
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our SELECT statement
                result = db.execute(
                    """
                    SELECT id
                            , full_name
                            , email
                            , zipcode
                            , hashed_password
                    FROM users
                    WHERE email = %s
                    """,
                    [email]
                )
                record = result.fetchone()
                if record is None:
                    return None

                return Account(
                    id=record[0],
                    full_name=record[1],
                    email=record[2],
                    zipcode=record[3],
                    hashed_password=record[4]
                )

    def create(self, account: AccountIn, hashed_password: str) -> Account:
        # connect the database
        with pool.connection() as conn:
            # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our INSERT statement
                result = db.execute(
                    """
                    INSERT INTO users
                        (full_name, email, zipcode, hashed_password)
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        account.full_name,
                        account.email,
                        account.zipcode,
                        hashed_password
                    ]
                )
                id = result.fetchone()[0]
                return Account(
                    id=id,
                    full_name=account.full_name,
                    email=account.email,
                    zipcode=account.zipcode,
                    hashed_password=hashed_password
                )