import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class ThreeBallGame extends JPanel implements ActionListener {

    // മാത്തി ബോൾ
    private int x1 = 50, y1 = 50;
    private int xSpeed1 = 2, ySpeed1 = 3;

    // എന്ന് ബോൾ
    private int x2 = 150, y2 = 100;
    private int xSpeed2 = 3, ySpeed2 = 2;

    // ഐനു ബോൾ
    private int x3 = 250, y3 = 150;
    private int xSpeed3 = 2, ySpeed3 = 2;

    private Timer timer;

    public ThreeBallGame() {
        setBorder(BorderFactory.createLineBorder(Color.BLACK));
        setBackground(Color.WHITE);
        timer = new Timer(10, this);
        timer.start();
    }

    // മൂന്ന് ബോളുകളും അവയുടെ പേരുകളും വരയ്ക്കുന്നു
    public void paintComponent(Graphics g) {
        super.paintComponent(g);

        // മാത്തി ബോൾ
        g.setColor(Color.RED);
        g.fillOval(x1, y1, 30, 30);
        g.setColor(Color.BLACK);
        g.drawString("മാത്തി", x1 + 5, y1 + 20);

        // എന്ന് ബോൾ
        g.setColor(Color.GREEN);
        g.fillOval(x2, y2, 30, 30);
        g.setColor(Color.BLACK);
        g.drawString("എന്ന്", x2 + 5, y2 + 20);

        // ഐനു ബോൾ
        g.setColor(Color.YELLOW);
        g.fillOval(x3, y3, 30, 30);
        g.setColor(Color.BLACK);
        g.drawString("ഐനു", x3 + 5, y3 + 20);
    }

    // ഓരോ ബോളിന്റെയും സ്ഥാനം മാറ്റുകയും അതിരുകളിൽ നിന്ന് തിരിക്കുകയും ചെയ്യുന്നു
    @Override
    public void actionPerformed(ActionEvent e) {
        // മാത്തി ബോളിന്റെ ചലനം
        x1 += xSpeed1;
        y1 += ySpeed1;
        if (x1 + 30 > getWidth() || x1 < 0) {
            xSpeed1 = -xSpeed1;
        }
        if (y1 + 30 > getHeight() || y1 < 0) {
            ySpeed1 = -ySpeed1;
        }

        // എന്ന് ബോളിന്റെ ചലനം
        x2 += xSpeed2;
        y2 += ySpeed2;
        if (x2 + 30 > getWidth() || x2 < 0) {
            xSpeed2 = -xSpeed2;
        }
        if (y2 + 30 > getHeight() || y2 < 0) {
            ySpeed2 = -ySpeed2;
        }

        // ഐനു ബോളിന്റെ ചലനം
        x3 += xSpeed3;
        y3 += ySpeed3;
        if (x3 + 30 > getWidth() || x3 < 0) {
            xSpeed3 = -xSpeed3;
        }
        if (y3 + 30 > getHeight() || y3 < 0) {
            ySpeed3 = -ySpeed3;
        }

        repaint();
    }

    // പ്രോഗ്രാം പ്രവർത്തിപ്പിക്കാൻ
    public static void main(String[] args) {
        JFrame frame = new JFrame("Mallu - Three Balls");
        ThreeBallGame gamePanel = new ThreeBallGame();
        frame.add(gamePanel);
        frame.setSize(500, 400);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);
    }
}
![1000044683](https://github.com/user-attachments/assets/4c24d2a7-5615-4ec9-8799-e76162f293a6)
![1000044683](https://github.com/user-attachments/assets/6dbf1688-75d2-4f8f-a737-0900c739223d)
