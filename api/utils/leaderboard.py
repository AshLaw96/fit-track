from .notifications import send_notification


def check_and_notify_leaderboard_change(challenge_id, user):
    from ..models import CustomUser
    # Fetch all users ordered by points descending
    leaderboard = list(
        CustomUser.objects
        .order_by("-points")
        .values_list("id", flat=True)
    )

    try:
        new_rank = leaderboard.index(user.id) + 1
        old_rank = user.last_known_rank

        if old_rank is not None and new_rank != old_rank:
            direction = "up" if new_rank < old_rank else "down"
            send_notification(
                user,
                title="Global Leaderboard Rank Changed 🏆",
                message=(
                    f"You've moved {direction} to #{new_rank} "
                    "on the global leaderboard!"
                ),
                type="leaderboard",
                link="/#global-leaderboard"
            )

        user.last_known_rank = new_rank
        user.save(update_fields=["last_known_rank"])

    except ValueError:
        # User not on leaderboard
        pass
