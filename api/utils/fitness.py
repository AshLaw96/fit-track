def estimate_steps_from_exercise(exercise):
    """
    Estimate steps based on the type and duration of an exercise instance.

    Args:
        exercise: A model instance or dict with `type` and `duration` fields.

    Returns:
        int: Estimated number of steps.
    """
    duration = (
        getattr(exercise, "duration", None) or exercise.get("duration", 0)
    )
    ex_type = getattr(exercise, "type", None) or exercise.get("type", "")

    if ex_type == "cardio":
        return duration * 120
    elif ex_type == "strength":
        return duration * 60
    elif ex_type == "flexibility":
        return duration * 30
    elif ex_type == "sports":
        return duration * 100
    else:
        return duration * 80
