"""Init

Revision ID: e9906f2dec56
Revises: 
Create Date: 2025-01-20 23:15:59.268757

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlalchemy_file


# revision identifiers, used by Alembic.
revision: str = "e9906f2dec56"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "image",
        sa.Column("img", sqlalchemy_file.types.ImageField(), nullable=False),
        sa.Column("hash", sa.String(), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("hash"),
    )
    op.create_table(
        "user",
        sa.Column("token", sa.String(), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("token"),
    )
    op.create_table(
        "stylemix",
        sa.Column("content_id", sa.Integer(), nullable=True),
        sa.Column("style_id", sa.Integer(), nullable=True),
        sa.Column("user_id", sa.Integer(), nullable=True),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["content_id"],
            ["image.id"],
        ),
        sa.ForeignKeyConstraint(
            ["style_id"],
            ["image.id"],
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["user.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "imagemix",
        sa.Column("img", sqlalchemy_file.types.ImageField(), nullable=False),
        sa.Column("settings", sa.PickleType(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=True),
        sa.Column("style_mix_id", sa.Integer(), nullable=True),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["style_mix_id"],
            ["stylemix.id"],
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["user.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("imagemix")
    op.drop_table("stylemix")
    op.drop_table("user")
    op.drop_table("image")
    # ### end Alembic commands ###