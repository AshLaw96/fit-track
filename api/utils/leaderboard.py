from ..models import UserChallenge
from .notifications import send_notification


def check_and_notify_leaderboard_change(challenge_id, user):
    leaderboard = list(
        UserChallenge.objects
        .filter(challenge__id=challenge_id)
        .order_by("-progress")
        .values_list("user_id", flat=True)
    )

    try:
        # 1-based indexing
        new_rank = leaderboard.index(user.id) + 1
        user_challenge = UserChallenge.objects.get(
            user=user, challenge_id=challenge_id
        )
        old_rank = user_challenge.last_known_rank

        if old_rank is not None and new_rank != old_rank:
            direction = "up" if new_rank < old_rank else "down"
            send_notification(
                user,
                title="Leaderboard Rank Changed 🏆",
                message=f"You've moved {direction} to #{new_rank}!",
                type="leaderboard"
            )

        # Always update rank
        user_challenge.last_known_rank = new_rank
        user_challenge.save(update_fields=["last_known_rank"])

    except ValueError:
        # User not on leaderboard
        pass
