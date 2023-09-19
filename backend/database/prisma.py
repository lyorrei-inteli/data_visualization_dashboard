from prisma import Prisma

db = Prisma(auto_register=True)

async def get_db():
    await db.connect()
    try:
        yield db
    finally:
        await db.disconnect()