from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from flask_bcrypt import Bcrypt
from sqlalchemy import select

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    visitados = relationship(
        "Visitado", back_populates="user", cascade="all, delete-orphan")
    
    favoritos = relationship(
        "Favorito", back_populates="user", cascade="all, delete-orphan")
    
    guardados = relationship(
        "Guardado", back_populates="user", cascade="all, delete-orphan")
    
    descartados = relationship(
        "Descartado", back_populates="user", cascade="all, delete-orphan")

    def create_user(self, email, password):
        self.email = email
        self.password = bcrypt.generate_password_hash(password).decode("utf-8")
        self.is_active = True
        db.session.add(self)
        db.session.commit()

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    @staticmethod
    def search_user(email, password):
        find_user = db.session.execute(
            select(User).where(User.email == email)
        ).scalar_one_or_none()

        if find_user is None:
            return None
        if not find_user.check_password(password):
            return None
        return find_user

    @staticmethod
    def update_password(email, old_password, new_password):
        find_user = db.session.execute(
            select(User).where(User.email == email)
        ).scalar_one_or_none()

        if find_user and find_user.check_password(old_password):
            find_user.password = bcrypt.generate_password_hash(new_password).decode("utf-8")
            db.session.commit()
            return True
        return False

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email
        }


class Visitado(db.Model):
    __tablename__ = "visitado"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(250), nullable=False)
    tipo: Mapped[str] = mapped_column(String(250))
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)

    user = relationship("User", back_populates="visitados")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "tipo": self.tipo
        }

class Favorito(db.Model):
    __tablename__ = "favorito"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(250), nullable=False)
    tipo: Mapped[str] = mapped_column(String(250))
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)

    user = relationship("User", back_populates="favoritos")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "tipo": self.tipo
        }

class Guardado(db.Model):
    __tablename__ = "guardado"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(250), nullable=False)
    tipo: Mapped[str] = mapped_column(String(250))
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)

    user = relationship("User", back_populates="guardados")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "tipo": self.tipo
        }

class Descartado(db.Model):
    __tablename__ = "descartado"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(250), nullable=False)
    tipo: Mapped[str] = mapped_column(String(250))
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)

    user = relationship("User", back_populates="descartados")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "tipo": self.tipo
        }