from torch.profiler import profile, ProfilerActivity
from torch.utils.data import DataLoader

from .trainer import StyleTrainer


def profiler(dataloader: DataLoader, trainer: StyleTrainer):
    """Проверка на производительность."""
    with profile(
        activities=[ProfilerActivity.CPU, ProfilerActivity.CUDA],
        profile_memory=True,
        record_shapes=True,
    ) as prof:
        try:
            trainer.fit(dataloader)
        except KeyboardInterrupt:
            print("end")
            print(
                prof.key_averages(group_by_stack_n=5).table(
                    sort_by="self_cpu_time_total", row_limit=20
                )
            )
            prof.key_averages(group_by_input_shape=True).table(
                sort_by="cpu_time_total", row_limit=10
            )

    prof.export_chrome_trace("trace.json")
