<?php

namespace Drupal\ajax_call\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\node\Entity\Node;
use \Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\views\Controller;

class eventosController extends ControllerBase
{
  public function eventosDetails()
  {
    $evento_selected = $_REQUEST['evento_selected'];
    $get_path = explode("/", \Drupal::service('path.current')->getPath());
    $markup = \Drupal::service('renderer')->render(views_embed_view('eventos', 'events', "$evento_selected"));
    return new Response($markup);
  }
}
