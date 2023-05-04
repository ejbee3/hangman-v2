<script lang="ts" context="module">
  export function drawManSwitch(condition: string, ctx: any) {
    switch (condition) {
      case "stand plus noose":
        ctx.strokeRect(15, 120, 60, 20);
        ctx.beginPath();
        ctx.moveTo(35, 120);
        ctx.lineTo(35, 25);
        ctx.lineTo(140, 25);
        ctx.lineTo(140, 45);
        ctx.stroke();
        break;
      case "head":
        ctx.beginPath();
        ctx.arc(140, 57, 12, 0, Math.PI * 2);
        ctx.stroke();
        break;
      case "body":
        ctx.beginPath();
        ctx.moveTo(140, 70);
        ctx.lineTo(140, 102);
        ctx.stroke();
        break;
      case "left leg":
        ctx.beginPath();
        ctx.moveTo(140, 102);
        ctx.lineTo(123, 120);
        ctx.stroke();
        break;
      case "right leg":
        ctx.beginPath();
        ctx.moveTo(140, 102);
        ctx.lineTo(157, 120);
        ctx.stroke();
        break;
      case "left arm":
        ctx.beginPath();
        ctx.moveTo(140, 85);
        ctx.lineTo(120, 72);
        ctx.stroke();
        break;
      case "right arm":
        ctx.beginPath();
        ctx.moveTo(140, 85);
        ctx.lineTo(160, 72);
        ctx.stroke();
        break;
    }
  }
</script>
